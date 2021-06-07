# Base image
FROM python:3.9.5-buster

# Create directories and copy files
RUN echo 'Creating directory and copying files'
RUN mkdir /crawler
COPY . /crawler
WORKDIR /crawler

# Install dependencies
RUN echo 'Installing dependencies'
RUN pip install -r requirements.txt

# Expose ports
RUN echo 'Exposing ports'
EXPOSE 22026

# Start API
RUN echo 'Starting API'
CMD ["python3", "api.py"]
