from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
import json
import sys


# コマンドライン引数から画像ファイルのパスを取得

# 画像処理
subscription_key = "xx"
endpoint = "xx"
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))


# 物体のタグ（名前）を取得する関数
def get_tags(filepath):
    local_image = open(filepath, "rb")

    tags_result_local = computervision_client.tag_image_in_stream(local_image)
    tags = tags_result_local.tags
    tag_names = [tag.name for tag in tags]
    return tag_names


# 物体を検知する関数
def detect_objects(filepath):
    local_image_objects = open(filepath, "rb")
    
    detect_objects_results_local = computervision_client.detect_objects_in_stream(local_image_objects)
    objects=detect_objects_results_local.objects
    return objects



# processed_image = some_image_processing_library.process_image(image_path)

# 結果を出力
# print("Processed Image:", processed_image)

img_path='sample1.png'
tag_name=get_tags(img_path)
tags_name=",".join(tag_name)

print(tags_name)