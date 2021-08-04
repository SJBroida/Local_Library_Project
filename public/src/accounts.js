
//Return the first located account object that matches the given ID.
function findAccountById(accounts, id) {

  //Search the array of account objects and return the account object that matches the given ID.
  return accounts.find((theAccount) => theAccount.id === id);

}

//Return an array of account objects that has been sorted by last name.
function sortAccountsByLastName(accounts) {

  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);

}

//Return a number representing how many times an account has checked out a book.
function getTotalNumberOfBorrows(account, books) {

  //"borrows" is in between brackets because it is destructuring books to just their borrows data
  return books.reduce((acc, {borrows}) => {
    //Check if a borrow record in borrows has an ID that matches the account ID
    if (borrows.some((borrow) => borrow.id === account.id)) {
      //If they match, increment the accumulator by one.
      acc++;
    }
    //Return back to the Reduce Function to loop again to the next book.
    return acc;
  }, 0);

  //Below is a break down of the logic used to create the above.

  /*
  //Create a counter to keep track of how many borrow records the given account has created.
  let borrowTotal = 0;

  //Search through each book in the array of objects
  for(let i = 0; i < books.length; i++) {
    const theBook = books[i];

    //Search through the borrow record of each book
    for(let j = 0; j < theBook.borrows.length; j++) {
      const theBorrowRecordID = theBook.borrows[j].id;
      //If the ID in the borrow record is equal to the account ID, then increment borrowTotal.
      if(theBorrowRecordID === account.id) {
        borrowTotal += 1;
      }
    }
  }

  //Return the counter keeping track of the borrow records the given account created.
  return borrowTotal;
  */

}

function getBooksPossessedByAccount(account, books, authors) {

  //Create an array of books currently checked out by given account
  let checkedOutBooks = books.filter(({borrows}) => {
    //Check if the borrow record in borrows has an ID that matches the account ID
    //AND checks if the book has not yet been returned.
    return borrows.some((borrow) => borrow.id === account.id && borrow.returned === false);
  });
  
  //Adds the author information to each book that was checked out.
  return booksWithAuthors = checkedOutBooks.map(book => {
    //Pull the Author Data from the authors array
    let author = authors.find(author => book.authorId === author.id);
    //Add the author data to the current book object
    return {author, ...book};
  })
  
  //Below is a break down of the logic used to create the above.

  /*
  //Create an empty array that represents the books the current account checked out.
  let booksCheckedOut = [];

  //Loop through all of the books in the array.
  for(let i = 0; i < books.length; i++) {
    const theCurrentBook = books[i];

    //No need to check anything other than the first entry in the borrows array.
    //Check if the book has not been returned, and if the current borrow ID matches the account's ID.
    if(theCurrentBook.borrows[0].returned === false && theCurrentBook.borrows[0].id === account.id) {
      //Use helper function to take the current book and stick the author information in.
      const bookWithAuthor = _addAuthorToBook(theCurrentBook, authors);
      //Add the book to the array.
      booksCheckedOut.push(bookWithAuthor);
    }
  }

  //Return the completed array of books checked out.
  return booksCheckedOut;
}

function _addAuthorToBook(book, authors) {

  //Create editable object using the book object passed in parameters.
  let bookWithAuthor = book;

  //Loop through the array of authors to find the desired author
  for(let i = 0; i < authors.length; i++) {
    const theAuthor = authors[i];

    //Check if the authorID in the book matches the ID of the current author.
    if(book.authorId === theAuthor.id) {
      //Create a new key in the object called "author" which has the contents of the current Author.
      bookWithAuthor["author"] = theAuthor;
    }
  }

  //Return the book that now has the author information added to it.
  return bookWithAuthor;
  */

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
