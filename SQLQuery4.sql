SELECT * FROM Category ORDER BY Name

INSERT INTO Category (Name) VALUES('TEST')


SELECT 
c.Id as CategoryId, 
c.Name as CategoryName 
FROM Category c
WHERE Id = 2

SELECT 
                                        c.Id as CategoryId,
                                        c.Name as CategoryName 
                                        FROM Category c
ORDER BY Name