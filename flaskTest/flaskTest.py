from flask import Flask
import requests
import json
import collections
import time
import datetime

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/anime/<path:imageLink>")
def getAnimeName(imageLink):
    r = requests.get(f'https://trace.moe/api/search?url={imageLink}')
    response = r.json()
    print("GETTING THE ANIME BOIS")
    print(type(response))
    result = json.dumps(response)
    jsonResult = json.loads(result)
    print("JFIOEJFIOAJFIOE")
    print(jsonResult['CacheHit'])

    animeName = str(jsonResult['docs'][0]['anime'])
    animeEpisode = str(jsonResult['docs'][0]['episode'])
    animeSimilarity = str(jsonResult['docs'][0]['similarity'])
    animeTimeMin = str(datetime.timedelta(seconds = jsonResult['docs'][0]['at']))

    resultString = (f'Anime: {animeName} Ep: {animeEpisode} Similarity: {animeSimilarity} Time: {animeTimeMin}')

# printing result as string

    most_common = collections.Counter(result).most_common(1)
    print(most_common)
    return(resultString)
