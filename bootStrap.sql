create database homebuyer;

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
    user_id int references users(id),
    list_id int references lists(id),
    neighborhood int,
    commute int null,
    safety int null,
    schools int null,
    yard int null,
    kitchen int null
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
    neighborhood int null,
    commute int null,
    safety int null,
    schools int null,
    yard int null,
    kitchen int null
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

--Users
insert into users (name, email, password) values ('Daniel Wood', 'wooddan22@gmail.com', 'password');
insert into users (name, email, password) values ('Brandon Shepherd', 'brandonkshepherd@gmail.com', 'password');
insert into users (name, email, password) values ('Heather Hargreaves', 'heathermhargreaves@gmail.com@gmail.com', 'password');

--lists

insert into lists (user_id, name, create_date) values (1, 'My List', CURRENT_TIMESTAMP(2));
insert into lists (user_id, name, create_date) values (2, 'Cool List', CURRENT_TIMESTAMP(2));

--priorities
insert into priorities (user_id, list_id, neighborhood, commute, safety, schools, yard, kitchen) values (1, 1, 6, 7, 5, 7, 9, 9);

--homes
insert into homes(list_id, nickname, price, address_1, address_2, city, zip, province, bathrooms, bedrooms, sq_feet, year_build, description, days_listed)
values (1, 'dans house', 234928, '4842 Winterbrook Circle', 'basement apt', 'Herriman', '84096', 'UT', 1, 1, 850, 2005, 'basement apt i dont really like', 25);

--images 
insert into images(home_id, url) values (1, 'http://redriverunited.org/wp-content/uploads/2014/10/home.png');

--ratings
insert into ratings(home_id, user_id, neighborhood, commute, safety, schools, yard, kitchen)
values (1, 1, 7, 9, 8, 7, 8, 9);



