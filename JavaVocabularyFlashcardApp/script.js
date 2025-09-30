// Get references to all the HTML elements we'll be working with
const cardInner = document.querySelector('.card-inner');
const termEl = document.querySelector('.term');
const definitionEl = document.querySelector('.definition');
const codeExampleEl = document.querySelector('.code-example code');
const prevBtn = document.getElementById('prev-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const nextBtn = document.getElementById('next-btn');
const cardCounterEl = document.querySelector('.card-counter');

// --- FLASHCARD DATA ---
// All of our vocabulary is stored in this array of objects
const flashcards = [
    {
        term: 'class',
        definition: 'A blueprint for creating objects. It defines properties and methods common to all objects of one type.',
        codeExample: `public class Dog {\n    String breed;\n\n    void bark() {\n        System.out.println("Woof!");\n    }\n}`
    },
    {
        term: 'Object',
        definition: 'An instance of a class. It is a self-contained entity that consists of both data (properties) and procedures (methods).',
        codeExample: `// Creates an object of the Dog class\nDog myDog = new Dog();`
    },
    {
        term: 'static',
        definition: 'A keyword indicating a member belongs to the class itself, rather than to an instance (object) of the class.',
        codeExample: `public class Car {\n    public static int carCount = 0;\n\n    public Car() {\n        carCount++;\n    }\n}`
    },
    {
        term: 'Inheritance',
        definition: 'An OOP concept where a new class (subclass) derives properties and methods from an existing class (superclass).',
        codeExample: `// Dog inherits from Animal\npublic class Dog extends Animal {\n    // ...\n}`
    },
    {
        term: 'Polymorphism',
        definition: 'An OOP concept that allows an object to take on many forms. It lets you perform a single action in different ways.',
        codeExample: `Animal myPet = new Dog(); // A Dog object is a form of Animal\nmyPet.sound();`
    },
    {
        term: 'Encapsulation',
        definition: 'An OOP concept of bundling data (variables) and methods into a single unit (class), often restricting access with private variables and public getters/setters.',
        codeExample: `public class Person {    \nprivate String name;\n    public String getName() {\n        return name;    }\n}`
    },
    {
        term: 'final',
        definition: 'A keyword to create constants. A final variable cannot be changed, a final method cannot be overridden, and a final class cannot be inherited.',
        codeExample: `final double PI = 3.14159;`
    },
    {
        term: 'Constructor',
        definition: 'A special method used to initialize objects. The constructor is called when an object of a class is created.',
        codeExample: `public class MyClass {\n    int x;\n    public MyClass() { // This is the constructor\n        x = 5;    }\n}`
    },
    {
        term: 'void',
        definition: 'A keyword that indicates a method does not return any value.',
        codeExample: `public void printMessage() {\n    System.out.println("Hello");\n}`
    },
    {
        term: 'this',
        definition: 'A keyword that refers to the current instance of the class. It resolves ambiguity between instance variables and parameters.',
        codeExample: `public class Student {\n    private String name;\n\n    public Student(String name) {\n        this.name = name;    }\n}`
    },
    {
        term: 'Interface',
        definition: 'A reference type that defines a "contract." Any class that implements an interface must provide an implementation for all its abstract methods.',
        codeExample: `public interface Drivable {\n    void drive();\n}\n\nclass Car implements Drivable { ... }`
    },
    {
        term: 'ArrayList',
        definition: 'A resizable array from the java.util package. It allows you to add or remove elements dynamically.',
        codeExample: `ArrayList<String> names = new ArrayList<>();\nnames.add("Alice");\nnames.add("Bob");`
    },
        {
        term: 'try-catch',
        definition: 'A block of code used to handle exceptions. The "try" block contains code that might throw an error, and the "catch" block handles it.',
        codeExample: `try {\n    int result = 10 / 0;\n} catch (Exception e) {\n    System.out.println("Cannot divide by zero!");\n}`
    },
    {
        term: 'HashMap',
        definition: 'A data structure that stores items in "key-value" pairs. It uses a key to find its corresponding value quickly.',
        codeExample: `HashMap<String, Integer> scores = new HashMap<>();\nscores.put("Alice", 100);`
    },
    {
        term: 'Set',
        definition: 'A collection that stores only unique elements. It is useful for making sure there are no duplicates in your data.',
        codeExample: `Set<String> names = new HashSet<>();\nnames.add("apple");\nnames.add("apple"); // This one will be ignored.`
    },
        {
        term: 'Method Overriding',
        definition: 'When a subclass provides its own specific implementation of a method that is already defined in its parent class.',
        codeExample: `class Animal { void sound() {} }\nclass Dog extends Animal {\n    @Override\n    void sound() { System.out.println("Woof"); }\n}`
    },
    {
        term: 'private',
        definition: 'An access modifier. Members declared as private are only accessible within the same class.',
        codeExample: `public class Person {\n    private String ssn;\n}`
    },
    {
        term: 'super',
        definition: 'A keyword used to refer to the immediate parent class, often to call its constructor or methods.',
        codeExample: `public class Dog extends Animal {\n    public Dog() {\n        super(); // Calls the Animal constructor\n    }\n}`
    },
    {
        term: 'Abstraction',
        definition: 'The concept of hiding complex implementation details and showing only the essential features of an object.',
        codeExample: `// You can drive() the car without knowing how the engine works.\nabstract class Vehicle {\n    abstract void drive();\n}`
    },
    {
        term: 'Method Overloading',
        definition: 'When two or more methods in the same class have the same name but different parameters (different number or type of arguments).',
        codeExample: `public void print(String s) { ... }\npublic void print(int i) { ... }`
    },
];

// --- STATE VARIABLES ---
let currentCardIndex = 0;
let isFlipped = false;

// --- FUNCTIONS ---

// Function to display the current card's data
function showCard() {
    const card = flashcards[currentCardIndex];
    termEl.textContent = card.term;
    definitionEl.textContent = card.definition;
    codeExampleEl.textContent = card.codeExample;
    cardCounterEl.textContent = `${currentCardIndex + 1} / ${flashcards.length}`;
    
    // Make sure the card is reset to its front face when we show a new one
    isFlipped = false;
    cardInner.classList.remove('is-flipped');
}

// Function to flip the card
function flipCard() {
    isFlipped = !isFlipped;
    cardInner.classList.toggle('is-flipped');
}

// Function to show the next card
function showNextCard() {
    currentCardIndex++;
    if (currentCardIndex >= flashcards.length) {
        currentCardIndex = 0; // Loop back to the start
    }
    showCard();
}

// Function to show the previous card
function showPrevCard() {
    currentCardIndex--;
    if (currentCardIndex < 0) {
        currentCardIndex = flashcards.length - 1; // Loop to the end
    }
    showCard();
}

// Function to shuffle the flashcards array (Fisher-Yates shuffle)
function shuffleCards() {
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    currentCardIndex = 0;
    showCard();
    alert("Deck has been shuffled!");
}

// --- EVENT LISTENERS ---

// Add a click listener to the card itself to trigger the flip
cardInner.addEventListener('click', flipCard);

// Add click listeners to the navigation buttons
nextBtn.addEventListener('click', showNextCard);
prevBtn.addEventListener('click', showPrevCard);
shuffleBtn.addEventListener('click', shuffleCards);

// --- INITIALIZE ---

// Show the first card when the page loads
showCard();