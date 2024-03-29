### MongoDB Data Dictionary for Legal Tech Tales

Here's a data dictionary for the Legal Tech Tales project

#### User Collection

**Collection Name**: `users`

**Fields**:
- `id`: ObjectId (Primary Key, automatically generated by MongoDB)
- `name`: String (max length: 20 characters)
- `email`: String (max length: 150 characters, unique)
- `password`: String (max length: 64 characters)

#### Article Collection

**Collection Name**: `articles`

**Fields**:
- `id`: ObjectId (Primary Key, automatically generated by MongoDB)
- `authorId`: ObjectId (Foreign Key, references `users.id`)
- `creationTime`: Timestamp (default value: current timestamp at record creation time)
- `title`: String (max length: 100 characters)
- `body`: String (max length: 4000 characters)

#### Comment Collection

**Collection Name**: `comments`

**Fields**:
- `id`: ObjectId (Primary Key, automatically generated by MongoDB)
- `articleId`: ObjectId (Foreign Key, references `articles.id`)
- `authorId`: ObjectId (Foreign Key, references `users.id`)
- `creationTime`: Timestamp (default value: current timestamp at record creation time)
- `body`: String (max length: 5000 characters)

