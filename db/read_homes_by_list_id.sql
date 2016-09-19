select h.id, h.list_id, h.nickname, h.price, h.address_1, h.address_2, city, zip, province, bathrooms, bedrooms, h.sq_feet, h.year_build, h.description, h.days_listed, i.url
from homes h
left join images i on h.cover_image_id = i.id where h.list_id = $1 and h.active = true;

--select * from homes h left join images i on h.cover_image_id = i.id where list_id = 2 and active = true;