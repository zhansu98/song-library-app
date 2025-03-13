# Repositories:
- Frontend: https://github.com/zhansu98/song-library-app
- Backend: https://github.com/zhansu98/song-library-backend

# How to run the project
 ### Backend (Should be running first before the frontend):
- Built in Java 23 and is a simple h2 database with a basic java spring boot service for communication.
- A snapshot jar file (backend-0.0.1-SNAPSHOT.jar) is uploaded to the frontend and backend repo.
- This jar file can be used with ```java -jar backend-0.0.1-SNAPSHOT.jar``` from terminal and the backend should spin up on localhost:8080
- Alternatively:
- Clone source code.
- From terminal, start with ```mvn spring-boot:run```.
- This will run the server on localhost:8080.
- Alternatively, you can run mvn clean package which will create a jar file in the targets folder.
- From terminal, enter ```java -jar target/backend-0.0.1-SNAPSHOT.jar```
- Note the name of the jar may be different so be sure to check the name in the target folder once created.

### Frontend:
- Developed in Angular 19.2.2
- Clone source code, ```npm install```, then ```ng serve```.
- Navigate to localhost:4200 to see homepage.
- Frontend should already be configured to run on a proxy with just ```ng serve``` to prevent CORS issues, but if CORS issue should occur, run with ```ng serve --proxy-config proxy.conf.json```


# Addressing Project Requirements

## Task is to create a simple song library single page application.

**The application should display a list of songs. The initial song data can be hard-coded or fetched from a
server. If you choose to hard-code the song data, consider structuring your code such that it mimics the
way you would retrieve data from a server.**
- When the back end boots up it will always populated with the same 5 sample songs to start with.

**The song list should be filterable by release date and sortable by any attribute of the song.
The user should be able to add a new song to the list, delete a song from the list, and edit any song in the list.
When the user updates the list, those changes should be reflected on the website. You may persist the
changes on a server, but that is not required.**
- All songs in list will be fiterable by date inputs at the top of the list. Those input are also validated.
- By clicking on each of the song attribute labels (Title, Artist, etc.) on the table you can toggle between how the songs are sorted.
- Clicking the edit icon will bring up a dialog that is pre-loaded with the song's info and can be edited.
- Clicking the add song button will also bring up a dialog with no pre-loaded info for adding a new song.
- These dialogs are one component that is to be reusable and validation was added to each field.
- Songs must have a title and artist as well as a date and a price that is non-negative. The date can be put in the future for future releases and the price can be set at 0 since some songs can be free.
- Any changes made will persist in the backend server as long as it is running. However if the server were to be restarted it will wipe and repopulate with the same starting 5 sample songs.
- The delete button will bring up a confirmation dialog to confirm deletion. This dialog component is also reusable for any notification purposes.

**A message should show on a successful update. Randomly, say 1 out of 5 times, the save should fail, and
a corresponding error message should be shown.**

- Message dialogs will pop up for updates on operation success or failure (same component as deletion confirmation)
- The backend will randomly return an internal service error 500 about 20% of the time.

**The song object should have the following attributes (Id, Title, Artist, Release Date, Price).**

**The initial list of songs should contain 5 records.
The design of the page is up to you. The application should be responsive; we should be able to run it on
a phone as well as a desktop. The design does not need to be fancy; it can be very simple. Use the color
scheme from the www.copera.org website.**

- The styling was mainly done using angular materials and a custom color pallet was made using colors sampled from the copera.org website.

**Your solution should include tests when appropriate.**

- The frontend has tests using jasmine and can be run with ```ng test --code-coverage```
- Current test coverage:
    - Statements   : 86.53% ( 90/104 )
    - Branches     : 90.24% ( 37/41 )
    - Functions    : 84.44% ( 38/45 )
    - Lines        : 85.85% ( 85/99 )
- Testing prioritized the biggest component with the most logic inside.

# Future features to implement
- Packaging up the frontend and backend into one executable file for ease of running
- Possibly downgrading language versions to ones that are more widely used
- Incorporate more color scheming (adding color to confirmation and error pop ups)