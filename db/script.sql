--create database delivery;

--create table customer(
--	id uuid constraint pk_tb_customer primary key,
--	name text,
--	contact varchar,
--	create_at timestamp default now(),
--	active boolean not null 
--);

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
--create restaurants
--create order
--create status