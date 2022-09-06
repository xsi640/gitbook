FROM python:2.7
LABEL maintainer=suyang<suyang@126.com>
RUN pip install flask
COPY app.py /app/app.py
WORKDIR /app
EXPOSE 5000
CMD ["python", "app.py"]