insert into users (name, email, password, third_party_id, user_auth_type_id, token) values ($1, $2, null, $3, 2, $4);