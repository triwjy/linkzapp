FROM ruby:3.0.2-alpine as builder

RUN apk update && apk upgrade
RUN apk add --update alpine-sdk nodejs yarn sqlite-dev tzdata && rm -rf /var/cache/apk/*

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY Gemfile* $APP_HOME/
ENV SECRET_KEY_BASE mykey

RUN bundle install --without test

COPY package.json yarn.lock $APP_HOME

RUN yarn install --check-files

COPY . .

RUN bundle exec rails webpacker:install 
RUN bundle exec rails webpacker:install:react && bundle exec rails webpacker:compile

RUN rm -rf $APP_HOME/node_modules
RUN rm -rf $APP_HOME/tmp/*

FROM ruby:3.0.2-alpine
RUN apk add --update alpine-sdk sqlite-dev tzdata && rm -rf /var/cache/apk/*

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY --from=builder /app $APP_HOME
ENV SECRET_KEY_BASE mykey
RUN bundle install

CMD rm -f tmp/pids/server.pid \
  && bundle exec rails db:migrate \
  && bundle exec rails s -b 0.0.0.0
