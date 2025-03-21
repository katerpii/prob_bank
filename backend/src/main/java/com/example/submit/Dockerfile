FROM ubuntu:22.04

RUN apt update
RUN apt install -y \
    gcc \
    sudo 

WORKDIR /home

COPY submit.c submit.c

RUN gcc -o test submit.c

CMD ./test