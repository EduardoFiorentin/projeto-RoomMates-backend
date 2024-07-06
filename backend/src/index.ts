import express from 'express';
import dotenv from 'dotenv'
import { Server } from './Server';


dotenv.config()

const port = process.env.PORT || 3333;

const server = new Server(port);

server.start(); 