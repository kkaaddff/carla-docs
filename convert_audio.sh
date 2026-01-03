#!/bin/bash
# 检查是否传入了命令行参数
if [ $# -eq 0 ]; then
    echo "❌ 错误：请传入MP3文件路径作为参数！"
    echo "使用示例：./convert_audio.sh /Users/你的用户名/Desktop/原音频.mp3"
    exit 1
fi

# 命令行第一个参数作为输入文件路径
INPUT_FILE="$1"
# 自动生成输出文件名：替换原文件后缀为_output.mp3
OUTPUT_FILE="${INPUT_FILE%.mp3}_output.mp3"

# 检查输入文件是否存在
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ 错误：文件不存在 → $INPUT_FILE"
    exit 1
fi

# 应用新指定的ffmpeg转码参数
ffmpeg -loglevel warning \
    -c:a aac_at \
    -i "$INPUT_FILE" \
    -fflags +genpts \
    -af "aresample=async=1:first_pts=0,dynaudnorm" \
    -map_metadata -1 \
    -c:a libmp3lame -b:a 192k \
    -y "$OUTPUT_FILE"

# 检查转码是否成功
if [ $? -eq 0 ]; then
    echo -e "\n✅ 转码完成！"
    echo "输入文件：$INPUT_FILE"
    echo "输出文件：$OUTPUT_FILE"
else
    echo -e "\n❌ 转码失败！请检查文件是否为有效MP3。"
    exit 1
fi