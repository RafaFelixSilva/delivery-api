--create database delivery;

create table customer(
	id uuid constraint pk_tb_customer primary key,
	name text,
	contact varchar,
	create_at timestamp default now(),
	active boolean not null 
);

insert into customer values ('3859e28a-85f7-4583-8828-4a300cf96fc3','Rafael','07828075810', now(), true);

insert into customer (id, contact, active, name) values ('3859e28a-85f7-4222-4444-4a300cf96fc3','11940501957', true, 'João');

update customer set name = 'Bruno' where id = '3859e28a-85f7-4583-8828-4a300cf96fc3';
update customer set name = 'Rafael' where id = '3859e28a-85f7-4583-4444-4a300cf96fc3';
update customer set name = 'Edson' where id = '3859e28a-85f7-4222-4444-4a300cf96fc3';

select * from customer;

--delete from customer;
--delete from customer where name = 'Eduardo';

select * from customer order by name desc;

select c.*, a.* from customer c
	left join address a on a.id_customer = c.id;

--create address

create table address (
	id uuid primary key,
	id_customer uuid references customer(id),
	street text,
	number varchar(10),
	city text,
	zipcode varchar(10),
	create_at timestamp default now()
);

--create restaurants

create table restaurant (
	id uuid primary key,
	name text not null,
	description text,
	phone varchar,
	active boolean default true,
	create_at timestamp default now()
);

--create order

create table "order" (
	id uuid primary key,
	id_customer uuid references customer(id),
	id_restaurant uuid references restaurant(id),
	status text,
	total numeric(10,2),
	create_at timestamp default now()
);

--create status

create table status (
	id serial primary key,
	name text not null
);

alter table customer 
add email varchar;