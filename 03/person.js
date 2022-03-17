const person = {
  firstName: "Ken",
  lastName: "Takahashi",
  age: 29,
  gender: "male",
  interests: [
    {
      name: "programming",
      emoji: "💻",
    },
    {
      name: "motorcycle",
      emoji: "🏍",
    },
  ],
  greeting: function () {
    console.log("Hi! I'm " + this.firstName + " " + this.lastName);
  },
};

module.exports = person;
