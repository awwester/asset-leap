FROM python:3.6

ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*
RUN pip install pipenv

WORKDIR /app/api
COPY Pipfile* /app/api/
RUN pipenv install --system --deploy --ignore-pipfile

EXPOSE 8000
CMD ["python", manage.py", "runserver", "0.0.0.0:8000"]
