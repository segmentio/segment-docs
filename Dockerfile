FROM jekyll/jekyll

EXPOSE 4000

COPY . .
RUN jekyll build

ENTRYPOINT ["jekyll", "serve"]
