import sys
import some_image_processing_library

# コマンドライン引数から画像ファイルのパスを取得
image_path = sys.argv[1]

# 画像処理
processed_image = some_image_processing_library.process_image(image_path)

# 結果を出力
print("Processed Image:", processed_image)
