function findAuthorById(authors, id) {

  //Search the array of account objects and return the author object that matches the given ID.
  return authors.find((theAuthor) => theAuthor.id === id);

}

function findBookById(books, id) {

  //Search the array of account objects and return the book object that matches the given ID.
  return books.find((theBook) => theBook.id === id);

}

function partitionBooksByBorrowedStatus(books) {

  //Create 2 arrays, borrowed and unborrowed

  //Filter all checked out books to the borrowed array (borrows[0]===false)
  const borrowedArr = books.filter((book) => book.borrows[0].returned === false);
  //Filter all books in stock to the unborrowed array (borrows[0]===true)
  const unborrowedArr = books.filter((book) => book.borrows[0].returned === true);

  //Return an array with both borrowed and unborrowed inside it

  //Declare an empty array to assign the created arrays to
  const allBorrowed = [];
  //Push created arrays to empty array
  allBorrowed.push(borrowedArr);
  allBorrowed.push(unborrowedArr);
  //Return array with both created arrays
  return allBorrowed;

  //Below is a detailed break down of the logic used to create the above.

  /*
  //Create the initial array that will hold the two arrays of books.
  const twoBookStacks = [];
  //Create the initial array that contains books currently checked out.
  const checkedOut = [];
  //Create the initial array that contains books that are in stock.
  const inStock = [];

  //Loop through the books passed in the parameter
  for(let i = 0; i < books.length; i++) {
    //Create an object representing the current book we are reviewing.
    const theBook = books[i];
    //Check if the book is checked out by examining theBook.borrows.returned
    //theBook.borrows.returned is a boolean, so no need to add any conditionals to the if statement.
    //Remember to only check the most recent borrow record
    if(theBook.borrows[0].returned) {
      //If the book has been returned, then it is in stock, and can be added to the inStock array.
      inStock.push(theBook);
    } else {
      //If the book has not been returned, then it should be added to the checkedOut array.
      checkedOut.push(theBook);
    }
  }

  //After going through the loop, add the two stacks of books to the twoBookStacks array.
  twoBookStacks.push(checkedOut);
  twoBookStacks.push(inStock);

  //Return the filled array with the two stacks (arrays) of books.
  return twoBookStacks;
  */

}

function getBorrowersForBook(book, accounts) {

  //Create the empty array to return at the end of the function
  const result = [];
  //Create an array that is just the borrows array within the given book object.
  const {borrows} = book;
  //Loop through each entry in the borrows array.
  borrows.forEach(borrow=> {
    //Find the account whose ID matches the ID in the current borrow record.
    let account = accounts.find(acc => acc.id === borrow.id);
    //Add the return status to the current account object.
    account['returned'] = borrow.returned;
    //Push the current account object into the results array.
    result.push(account);
  });
  //Return the results, but only the first ten entries.
  return result.slice(0,10);

  //Below is a detailed break down of the logic used to create the above.

  /*
  //Create an empty array that will contain the list of 
  const borrowers = [];

  //loop through each record in the book's borrows array.
  for(let i = 0; i < book.borrows.length; i++) {

    //The list should be no more than ten items, so if the length is longer than 10,
    //the conditional if statement will make sure nothing new is added once the limit is reached.
    if(i < 10){
      //Create constant for the ID of who borrowed the book.
      const theBorrower = book.borrows[i].id;
      //Create constant for whether or not the book has been returned.
      const returnStatus = book.borrows[i].returned;
      //Create constant for object that merges an account with return status.
      const returnedAccount = _addReturnStatusToAccount(accounts, theBorrower, returnStatus);
      //Add the returned account to the borrowers array.
      borrowers.push(returnedAccount);
    }
  }

  return borrowers;
  */

}

//The below helper function was used previously to add the return status to an account
/*
//This helper function takes an array of accounts, an account ID, and a return Status.
function _addReturnStatusToAccount(accounts, theBorrower, returnStatus) {

  //Loop through the list of accounts to find the one that matches the ID of the borrower.
  for(let i = 0; i < accounts.length; i++) {
    //Create constant for the account currently being reviewed.
    let theAccount = accounts[i];
    //Check and see if the current account matches the ID passed in parameters
    if(theAccount.id === theBorrower) {
      //If it's a match, add the return status to the account
      theAccount["returned"] = returnStatus;
      //After adding it, return the account to where it was called.
      return theAccount;
    }
  }

}
*/

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
