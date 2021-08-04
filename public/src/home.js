//Returns the length of the books array.
function getTotalBooksCount(books) {

  return books.length;

}

//Returns the length of the accounts array.
function getTotalAccountsCount(accounts) {

  return accounts.length;

}

//Get a count of how many books are currently checked out.
function getBooksBorrowedCount(books) {

  //Loop through the array of books to find out which ones are checked out.
  return books.reduce((acc, book) => {
    //Check the current book to see if it has been returned or not.
    const booksBorrowed = book.borrows[0].returned;
    //If the book has not yet been returned, increment the accumulator by one.
    if (booksBorrowed === false) {
      acc++;
    }
    //Return the accumulator value to loop again.
    return acc;
  }, 0);

  /*
  //Create a counter for how many books are checked out.
  let booksCheckedOut = 0;

  //Loop through the array of books
  for(let i = 0; i < books.length; i++) {
    //Create constant for the current book we are examining.
    const theBook = books[i];
    //Check if the book is checked out or not.
    //if the returned status is false, we want it to register as true, so we use the "!"
    //Don't forget, we're only checking the first borrow record in the borrows array.
    if(!theBook.borrows[0].returned) {
      //returned read as false, so we increment the counter.
      booksCheckedOut += 1;
    }
  }

  //Return how many books have been checked out.
  return booksCheckedOut;
  */
}

function getMostCommonGenres(books) {
  
  //Create object that contains genre names as keys and their counts as values.
  const genreCount = books.reduce((acc, {genre}) => {
    if (acc[genre]) {
      //If genre is listed in genre count, increments its count by one.
      acc[genre]+=1;
    } else{
      //If genre isn't listed in genre count, create the genre entry with value of one.
      acc[genre]=1;
    }
    return acc;
  }, {});

  //Get an array containing the correct order of keys based on the values in genre count.
  const sortedKeys = _sortObjectByValues(genreCount);
  //Create a new array of new objects using the sorted keys array with the name of the key and the value from genreCount
  const sorted = sortedKeys.map((key) => ({name: key, count: genreCount[key]}));
  
  //Return only the top five results from the sorted array.
  return _getTopFive(sorted);

  /*
  //Create an empty array which will be the sorted array before it's whittled to the top five.
  const topGenres = [];

  //Loop through the array of books
  for(let i = 0; i < books.length; i++){
    //Create constant for the current book being checked.
    const theBook = books[i];
    //Create constant for the current genre of the current book
    const theGenre = theBook.genre;
    //Create boolean for when checking if genre is already in topGenres or not.
    //Before checking, it is assumed to be false
    let existingGenre = false;

    //Loop through the topGenres array
    for(let j = 0; j < topGenres.length; j++) {
      //Create a constant for the current object being viewed in topGenres
      const genreEntry = topGenres[j];
      //Check if the genre is already listed in the topGenres array.
      //Begin by checking if the genre we are looking at is the one we are looking for.
      if(genreEntry.name === theGenre) {
        //If they are a match, then increment the count for that genre by 1 in the topGenres array.
        topGenres[j].count += 1;
        //Set existingGenre to true since it was found.
        existingGenre = true;
      }
    }

    //If existingGenre is still false after looping through the topGenres array
    //Create a new object to push into topGenres
    if(!existingGenre) {
      topGenres.push({"name" : theGenre, "count" : 1})
    }
    
  }

  //Sort the genres using the advanced Sort method
  topGenres.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));

  //Get the Top Five entries of the sorted list using the Helper Function.
  const topFiveGenres = _getTopFive(topGenres);

  //Return the Top Five Sorted Genres
  return topFiveGenres;
  */

}

function getMostPopularBooks(books) {

  //Return only the top five results
  return _getTopFive(
    //Create an array of objects that contain their book title and borrow record count.
    books.map((book) => {
      //Create an object containing the book title and borrow record length to pass back to the array
      return { name: book.title, count: book.borrows.length };
    //Sort the newly created array based on the count values
    }).sort(function (bookA, bookB) {
      return bookB.count - bookA.count;
    }));

  /*
  //Create an empty array which will be the sorted array before it's whittled to the top five.
  const topBooks = [];

  //Loop through the array of books
  for(let i = 0; i < books.length; i++) {
    //Create constant for the current book being checked.
    const theBook = books[i];
    //Pull the title of the book
    const bookTitle = theBook.title;
    //Pull the length of the borrows array.
    const bookBorrows = theBook.borrows.length;

    //Push the title and borrow count into the topBooks array.
    topBooks.push({"name" : bookTitle, "count" : bookBorrows})
  }

  //Sort the Books using the advanced Sort method
  topBooks.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));

  //Get the Top Five entries of the sorted list using the Helper Function.
  const topFiveBooks = _getTopFive(topBooks);

  //Return the Top Five Sorted Genres
  return topFiveBooks;
  */
}

function getMostPopularAuthors(books, authors) {

  //Use reduce to get an array of objects that have the correct keys and values
  const authorList = books.reduce((acc, book) => { 
    //Grab the authorId and borrows array
    const { authorId, borrows } = book;
    //Get the authorObj that matches the author ID from the current book.
    const authorObj = authors.find(author => author.id === authorId);
    //Build the author name from the authorObj
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    //Get the number of times this book has been borrowed
    const count = borrows.length;
    
    //See if we already have an entry for this author in the accumulator
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      //If we get in here, then we already have an entry for this author in the accumulator
      //So we need to just add to its borrow count
      authExists.count += count;
    } else {
      //If we get in here, then we don't have an entry for this author, so we need to add it
      const newAuthEntry = {name,count};
      acc.push(newAuthEntry);
    }

    //Finally, return the accumulator
    return acc;
  }, []);

  //Sort in descending order by count
  const sortedAuthorList = authorList.sort((authorA, authorB) => authorB.count - authorA.count);
  //Get the top five
  return _getTopFive(sortedAuthorList);

  /*
  //Create an empty array which will be the sorted array before it's whittled to the top five.
  const topAuthors = [];

  //Loop through the array of books
  for(let i = 0; i < books.length; i++){
    //Create constant for the current book being checked.
    const theBook = books[i];
    //Create constant for the current authorID of the current book
    const theAuthorId = theBook.authorId;
    //Create a string that will contain their name.
    let authorName = "";
    //Create boolean for when checking if author is already in topAuthors or not.
    //Before checking, it is assumed to be false
    let existingAuthor = false;

    //Loop through the array of authors
    for(let j = 0; j < authors.length; j++){
      //Create constant for the author currently being reviewed
      const theAuthor = authors[j];
      //Check if the author ID pulled from the book matches the author we are looking at.
      if(theAuthorId === theAuthor.id) {
        //If it's a match, create the name for the author.
        authorName = theAuthor.name.first + " " + theAuthor.name.last;
      }
    }

    //Loop through the topAuthors array
    for(let k = 0; k < topAuthors.length; k++) {
      //Create a constant for the current object being viewed in topGenres
      const authorEntry = topAuthors[k];
      //Check if the genre is already listed in the topGenres array.
      //Begin by checking if the genre we are looking at is the one we are looking for.
      if(authorEntry.name === authorName) {
        //If they are a match, then increment the count for that Author by how many times the book was borrowed.
        topAuthors[k].count += theBook.borrows.length;
        //Set existingGenre to true since it was found.
        existingAuthor = true;
      }
    }

    //If existingGenre is still false after looping through the topGenres array
    //Create a new object to push into topGenres
    if(!existingAuthor) {
      topAuthors.push({"name" : authorName, "count" : theBook.borrows.length})
    }
  }

  //Sort the genres using the advanced Sort method
  topAuthors.sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1));

  //Get the Top Five entries of the sorted list using the Helper Function.
  const topFiveAuthors = _getTopFive(topAuthors);

  //Return the Top Five Sorted Genres
  return topFiveAuthors;
  */

}

//Helper Function contributed by Betsy Bayliss
//Take an object and sort it based on values instead of keys.
function _sortObjectByValues(obj) {

  //Create an array to contain all the keys of the object.
  const keys = Object.keys(obj);

  //Return array of sorted keys
  return keys.sort((keyA, keyB) => {
    if(obj[keyA]>obj[keyB]){
      return -1;
    } else if(obj[keyB]>obj[keyA]) {
      return 1;
    }
    return 0;
  })

}

//Helper function created by Stephen Broida
function _getTopFive(preSortedList) {
  
  //Return a sliced array that only includes the first five objects.
  return preSortedList.slice(0,5);
  
  //Below is a break down of the logic used to create the above.

  /*
  //Create a new array that will be the Top Five list returned
  const theTopFive = [];

  //Loop through the first five entries of the array
  //Loop should end when it reaches five cycles or reaches end of the array
  //(Whichever comes first)
  for(let i = 0; i < preSortedList.length && i < 5; i++) {
    //Push the current object from the list into the array to be returned
    theTopFive.push(preSortedList[i]);
  }

  //Return the array, now sized for just the top five.
  return theTopFive;
  */
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
