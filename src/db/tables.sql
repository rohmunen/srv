CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(100),
  nickname VARCHAR(30)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  creator UUID,
  FOREIGN KEY (creator) REFERENCES users (id),
  name VARCHAR(40),
  sortOrder int default(0)
);

CREATE TABLE tokens (
  token varchar(512) PRIMARY KEY,
  userId UUID,
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE usertag (
  userId UUID,
  FOREIGN KEY (userId) REFERENCES users (id),
  tagId SERIAL ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (tagId) REFERENCES tags (id),
  PRIMARY KEY (userId, tagId)
);