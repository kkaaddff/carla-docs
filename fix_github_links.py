#!/usr/bin/env python3
"""
修复 VitePress 解析 GitHub 行号链接错误的脚本

问题：VitePress 的 Vue 编译器会把 Markdown 链接中的 #L47-L241 这样的片段
     误解析为 HTML/Vue 模板语法，导致 "Element is missing end tag" 错误。

解决方案：将包含 #L 行号片段的 Markdown 链接转换为 HTML <a> 标签格式。

使用方法：
    python3 fix_github_links.py
    
或者指定目录：
    python3 fix_github_links.py /path/to/content
"""

import os
import re
import sys

def fix_github_links(content):
    """
    将包含行号片段的 GitHub Markdown 链接转换为 HTML <a> 标签。
    
    例如:
    - [ActorAttribute.h](https://github.com/.../ActorAttribute.h#L47-L241)
    
    转换为:
    - <a href="https://github.com/.../ActorAttribute.h#L47-L241" target="_blank">ActorAttribute.h</a>
    """
    # 匹配包含 GitHub 行号片段的 Markdown 链接
    # 格式: [text](url#L123-L456) 或 [text](url#L123)
    pattern = r'\[([^\]]+)\]\((https://github\.com/[^)]+#L\d+(?:-L\d+)?)\)'
    
    def replace_link(match):
        text = match.group(1)
        url = match.group(2)
        return f'<a href="{url}" target="_blank">{text}</a>'
    
    return re.sub(pattern, replace_link, content)

def process_file(filepath):
    """处理单个 Markdown 文件。"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查文件是否包含需要修复的模式
        if not re.search(r'#L\d+(?:-L\d+)?', content):
            return False
        
        new_content = fix_github_links(content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"处理文件出错 {filepath}: {e}", file=sys.stderr)
        return False

def main(directory):
    """处理目录下所有 Markdown 文件。"""
    fixed_count = 0
    total_count = 0
    
    print(f"正在扫描目录: {directory}")
    print("-" * 60)
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                total_count += 1
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    # 显示相对路径
                    rel_path = os.path.relpath(filepath, directory)
                    print(f"✓ 已修复: {rel_path}")
                    fixed_count += 1
    
    print("-" * 60)
    print(f"扫描完成！共扫描 {total_count} 个文件，修复 {fixed_count} 个文件。")

if __name__ == '__main__':
    # 默认使用脚本所在目录下的 content 目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    default_dir = os.path.join(script_dir, 'content')
    
    if len(sys.argv) >= 2:
        target_dir = sys.argv[1]
    elif os.path.exists(default_dir):
        target_dir = default_dir
    else:
        target_dir = script_dir
    
    if not os.path.isdir(target_dir):
        print(f"错误: 目录不存在 - {target_dir}")
        sys.exit(1)
    
    main(target_dir)
