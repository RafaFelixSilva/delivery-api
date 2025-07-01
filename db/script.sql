create table customer(
	id uuid constraint pk_tb_customer primary key,
	name text,
	contact varchar,
	create_at timestamp default now(),
	active boolean not null 
);

select * from customer;

insert into customer values ('3859e28a-85f7-4583-8828-4a300cf96fc3','Rafael','07828075810',null, true);