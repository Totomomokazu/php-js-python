from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
import json
import sys

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
