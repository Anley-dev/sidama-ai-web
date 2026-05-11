 《Sidama AI: Low-Resource Language Translation》

​An English-to-Sidama Afoo translation engine built for accessibility and linguistic preservation.

●​Project Overview

​Sidama AI was developed to address the digital scarcity of the Sidama language. This project provides a resilient, web-based interface that bridges the gap between English and one of Ethiopia's key local languages. The core focus is on creating a functional tool that operates efficiently in low-bandwidth environments.

●​Technical Architecture

​Unlike standard translation tools that rely on constant API calls, Sidama AI utilizes a client-side search architecture to ensure zero latency and offline-first potential.

​1. Development Environment (Constraint-Driven)

​This project was engineered entirely within a mobile environment. The full development lifecycle—from data architecture to cloud deployment—was executed on a Samsung Galaxy A13 via Termux. This required a self-taught mastery of Linux environments, CLI-based version control, and resource-efficient coding practices outside of a traditional academic setting.

​2. Search Logic and Algorithmic Resilience

​To handle phonetic variations and common orthographic errors in Sidama language input, the system employs Approximate String Matching:
​Algorithm: Bitap search logic via Fuse.js.
​Optimization: Weighted keys were implemented to prioritize English phrase matches while maintaining a strict threshold to minimize false positives.

​3. Data Engineering Pipeline

​The backend "knowledge base" is a structured JSON dataset curated through:
​Manual Digitalization: Converting physical and academic linguistic records into structured data.
​Automation: Python-based merging scripts used to deduplicate and normalize raw text into a production-ready dictionary.

●​Current Stack

 •Languages: JavaScript (ES6), Python 3.x, HTML5, CSS3
 •Deployment: Vercel (CI/CD Pipeline)
 •Libraries: Fuse.js for fuzzy matching

●​Research & Future Roadmap

•​Speech-to-Speech: Integration of TTS (Text-to-Speech) modules for auditory learning.
•​Linguistic Bias: Investigating and correcting gender-based translation skews in localized machine translation.
•​Corpus Expansion: Scaling the dataset from 150+ phrases to a comprehensive regional corpus.
​Developer

​Anley Belay

Independent AI Developer & Full-Stack Engineer
Focus: Natural Language Processing (NLP) for Localized Systems
