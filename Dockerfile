FROM heroku/cedar:14

ENV NODE_VERSION v5.1.0
ENV NODE_PATH /app/heroku/node
ENV PROJECT_PATH /app/user
ENV PROFILE_D_PATH /app/.profile.d

# exposes binaries
ENV BIN_PATH $NODE_PATH/bin/:$PROJECT_PATH/node_modules/.bin/
ENV PATH $BIN_PATH:$PATH

WORKDIR $PROJECT_PATH

# Create some needed directories
RUN mkdir -p $NODE_PATH $PROFILE_D_PATH
RUN curl -s https://s3pository.heroku.com/node/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz | tar --strip-components=1 -xz -C $NODE_PATH
RUN echo 'export PATH="'$BIN_PATH':$PATH"' > $PROFILE_D_PATH/node.sh

# install global npm packages
RUN $NODE_PATH/bin/npm install \
    pm2 \
    bower \
    babel \
    babel-cli \
    babel-core \
    -g


