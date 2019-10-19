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
    #animeSimilarity = str((jsonResult['docs'][0]['similari                                                                                                                         ty']))
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

    return(animeDict)

@app.route("/animeMAL/<path:MALID>")
def getAnimeMALID(MALID):
    r = requests.get(f'https://api.jikan.moe/v3/anime/{MALID}')
    response = r.json()
    print(type(response))
    result = json.dumps(response)
    jsonResult = json.loads(result)
    resultURL = (jsonResult['url'])

    return(resultURL)

    #malURL = str(jsonResult['url'])
    #return(malURL)





# printing result as string
