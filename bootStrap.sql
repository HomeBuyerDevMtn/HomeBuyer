-- Run This part first

create database homebuyer;

\c homebuyer
-- Run the rest second
create table user_auth_types(
    id serial primary key,
    type varchar(100)
);

create table users (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) null,
  third_party_id varchar(255) null,
  user_auth_type_id int null,
  token varchar(255)
);

create table lists (
    id serial primary key,
    user_id int references users(id) not null,
    name varchar(255) not null,
    create_date timestamptz not null 
);

create table priorities (
    id serial primary key,
    list_id int references lists(id) not null,
    user_id int references users(id) not null,
    priority_description varchar(100) not null,
    priority_value int not null
);

create table homes (
    id serial primary key,
    list_id int references lists(id) not null,
    nickname varchar(255) not null,
    price int null,
    address_1 varchar(255) null,    
    address_2 varchar(255) null,
    city varchar(100) null,
    zip varchar(100) null,
    province varchar(100) null,
    bathrooms decimal(4,1) null,
    bedrooms int null,
    sq_feet int null,
    year_build int null,
    description text null,
    days_listed int null 
);

create table ratings (
    id serial primary key,
    home_id int references homes(id) not null,
    user_id int references users(id) not null,
    priority_id int references priorities(id) not null,
    rating_description varchar(100) not null,
    rating_value int not null
    
);

create table list_users (
    id serial primary key,
    list_id int references lists(id) not null,
    user_id int references users(id) not null
);

create table images (
    id serial primary key,
    home_id int references homes(id) not null,
    url text not null
);
--user_auth_types
insert into user_auth_types (type) values ('Local'),('Google');
--Users
 insert into users (name, email, password, third_party_id, user_auth_type_id, token) values ('Daniel Wood', 'wooddan22@gmail.com', 'blahblah', null, 1, 'sometoken');
--lists

insert into lists (user_id, name, create_date) values (1, 'My List', CURRENT_TIMESTAMP(2));
insert into lists (user_id, name, create_date) values (1, 'Cool List', CURRENT_TIMESTAMP(2));

--priorities
insert into priorities (list_id, user_id, priority_description) values (1, 1, 'Yard'), (1, 1, 'Schools'), (1, 1, 'Shopping'), (1, 1, 'Size'), (1, 1, 'Windows');
--homes
insert into homes(list_id, nickname, price, address_1, address_2, city, zip, province, bathrooms, bedrooms, sq_feet, year_build, description, days_listed)
values (1, 'dans house', 234928, '4842 Winterbrook Circle', 'basement apt', 'Herriman', '84096', 'UT', 1, 1, 850, 2005, 'basement apt i dont really like', 25);

--images 
insert into images(home_id, url) values (1, 'http://redriverunited.org/wp-content/uploads/2014/10/home.png');

--ratings



