## Conflicts && Resolutions
- The user only sees that the request is pending, no need to see if the request has been aproved by n number of people
    > So only the status pending and aprove will be used for all events while the request is being processed
- The referencing method of using mongoose.Schema.Types.ObjectId always works even if the provided id is false. this is bad
    > it shold only work if the id matches any member in the referenced model, otherwise throw an error... a thing which never happens (see model requests model)
- 