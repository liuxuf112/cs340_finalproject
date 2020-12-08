-------------------------below are queries for UserList Entity
--add a new User
INSERT INTO UserList (User_name, User_email, Address, Password)
VALUES (:User_nameInput, :User_emailInput, :AddressInput, :PasswordInput);

--update a User's password
UPDATE UserList
SET Password = :new_PasswordInput
WHERE User_ID = :User_IDInput;

--display all Users
SELECT * FROM UserList

--display single User
SELECT * FROM UserList
WHERE User_ID = :User_IDInput;





-------------------------below are queries for BookList Entity
--add a new Book to sell
INSERT INTO BookList (Book_name, Category, Owner_ID, On_Sell)
VALUES (:Book_nameInput, :CategoryInput, :Owner_IDInput, :On_SellInput);

--update a Book's Owner
UPDATE BookList
SET Owner_ID = :new_Owner_IDInput
WHERE Book_ID = :Book_IDInput;

--update a Book's On_Sell to negative value or positive value
UPDATE BookList
SET On_Sell = -1 -- '-1' indicates the book is not on sell. '1' indicates the book is on sell
WHERE Book_ID = :Book_IDInput;

--display a Book with all its Authors
SELECT * FROM BookList 
INNER JOIN Book_Author on BookList.Book_ID = Book_Author.Book_ID
WHERE Book_ID = :Book_IDInput;

--filtering books by book_name that are also on sell
SELECT * FROM BookList WHERE On_sell >= 0 and book_name = :Book_nameInput;

--filtering books by category that are also on sell
SELECT * FROM BookList WHERE On_sell >= 0 and Category = :CategoryInput;

--filtering books by Author_name that are also on sell
SELECT * FROM BookList 
INNER JOIN Book_Author on BookList.Book_ID = Book_Author.Book_ID
INNER JOIN AuthorList on Book_Author.Author_ID = AuthorList.Author_ID
WHERE On_sell >= 0 and Author_name = :Author_nameInput

--filtering books by prize that are also on sell
SELECT * FROM BookList WHERE On_sell >= 0 and prize = :prizeInput;

-------------------------below are queries for AuthorList Entity
--add a new Author
INSERT INTO AuthorList (Name)
VALUES (:NameInput);





-------------------------below are queries for OrderList Entity
--add a new Order
INSERT INTO OrderList (Order_cost, Order_date, Buyer_ID, Payment)
VALUES (:Order_costInput, :Order_dateInput, :Buyer_IDInput, :PaymentInput);

--display all orders associated with a specific Buyer
SELECT * FROM OrderList 
INNER JOIN User_Order_Book on OrderList.Order_ID = User_Order_Book.Order_ID
WHERE OrderList.Buyer_ID = :Buyer_IDInput;





-------------------------below are queries for Cart Entity
--add a new Book into Cart
INSERT INTO Cart (User_ID, Book_ID)
VALUES (:User_IDInput, :Book_IDInput);

--delete books from everyone's Cart if the book has been sold.
DELETE FROM Cart WHERE Book_ID = :Book_IDInput;

--after check out, the user's cart goes empty
DELETE FROM Cart WHERE User_ID = :User_IDInput;





-------------------------below are queries for Book_Author Entity
--add new relationship between a Author and a Book
INSERT INTO Book_Author (Book_ID, Author_ID)
VALUES (:Book_IDInput, :Author_IDInput);





-------------------------below are queries for User_Order_Book Entity
--add new relationship between User, Order and Book that indicates which User sells Which Book in Which Order
INSERT INTO User_Order_Book (User_ID, Order_ID, Book_ID)
VALUES (:User_IDInput, :Order_IDInput, :Book_IDInput);

