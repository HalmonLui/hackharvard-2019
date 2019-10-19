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
    print(type(response))
    result = json.dumps(response)
    jsonResult = json.loads(result)
    print(jsonResult['CacheHit'])

    animeName = str(jsonResult['docs'][0]['title_english'])
    animeEpisode = str(jsonResult['docs'][0]['episode'])
    #animeSimilarity = str((jsonResult['docs'][0]['similarity']))
    animeSimilarity = '{0:.1f}'.format((float(("%.3f" % round((jsonResult['docs'][0]['similarity']),4)))) * 100)

    animeTimeMin = str(datetime.timedelta(seconds = jsonResult['docs'][0]['at']))
    animeMALID = str(jsonResult['docs'][0]['mal_id'])

    resultString = (f'Anime: {animeName} Ep: {animeEpisode} Similarity: {animeSimilarity}% Time: {animeTimeMin}')

    animeDict = {
    "anime": animeName,
    "episode:": animeEpisode,
    "confidence": animeSimilarity,
    "time": animeTimeMin,
    "malID": animeMALID
    }

@app.route("/anime/<path:animeMALID>")
def getAnimeInfo(animeMALID):
    r = requests.get(f'https://api.jikan.moe/v3/anime/{animeMALID}')
    response = r.json()
    print(type(response))
    result = json.dumps(response)
    jsonResult = json.loads(result)
    print(jsonResult['url'])





# printing result as string
    print(type((float(("%.3f" % round((jsonResult['docs'][0]['similarity']),2))))))
    return(animeDict)
