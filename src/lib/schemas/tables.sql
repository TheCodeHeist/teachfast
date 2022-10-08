CREATE TABLE IF NOT EXISTS plans (id serial PRIMARY KEY,
                                                    content text, timestamp timestamptz,
                                                                            is_done bool);

CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY,
                                                  username text UNIQUE,
                                                                password text);