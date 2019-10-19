import discord
import random
from discord.ext import commands

client = commands.Bot(command_prefix = '.')

bot = commands.Bot('!')

# I've moved the command out of on_message so it doesn't get cluttered
@bot.event
async def on_message(message):
    channel = bot.get_channel('458778457539870742')
    if message.server is None and message.author != bot.user:
        await bot.send_message(channel, message.content)
    await bot.process_commands(message)

# This always sends the same message to the same person.  Is that what you want?
@bot.command(pass_context=True)
@commands.is_owner()  # The account that owns the bot
async def dm(ctx):
    memberID = "Chengi#1537"
    person = await bot.get_user_info(memberID)
    await bot.send_message(person, "WHAT I'D LIKE TO SAY TO THEM")
    await bot.delete_message(ctx.message)

@client.event
async def on_ready():
    print('Bot is ready.')

@client.command()
async def ping(ctx):
    await ctx.send(f'Pong! {round(client.latency * 1000)} ms')

@client.command(aliases=['8ball'])
async def _8ball(ctx, *, question):
    responses = ['of course',
                 'most definitely not',
                 'tis be unlikely',
                 'low chance friend',
                 'possibly',
                 'most definitely',
                 'for sure']

    await ctx.send(f'Question: {question}\nAnswer: {random.choice(responses)}')

@client.command()
async def clear(ctx, amount = 1):
    await ctx.channel.purge(limit=amount)



client.run('NjM0OTIyNzIzOTk4Njk1NDI0.XapmVA.DiFTugpoqcU5vbL82rXT6ZdT3JA')
