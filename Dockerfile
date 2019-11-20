FROM markhobson/maven-chrome

ENV CHROME_BIN /opt/google/chrome/google-chrome

COPY ./ /tmp/
WORKDIR /tmp/

RUN mvn clean deploy
