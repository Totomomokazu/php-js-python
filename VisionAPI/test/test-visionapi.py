from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
import json
import sys


# コマンドライン引数から画像ファイルのパスを取得
image_path = sys.argv[1]

# 画像処理
subscription_key = "xx"
endpoint = "xx"
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

def get_tags(filepath):
    local_image = open(filepath, "rb")
    tags_result_local = computervision_client.tag_image_in_stream(local_image)
    tags = tags_result_local.tags
    tag_names = [tag.name for tag in tags]
    return tag_names

if __name__ == "__main__":
    file_path = sys.argv[1]
    tags = get_tags(file_path)
    print(json.dumps(tags))


processed_image = some_image_processing_library.process_image(image_path)

# 結果を出力
print("Processed Image:", processed_image)