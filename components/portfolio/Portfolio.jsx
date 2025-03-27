import React, {useS} from 'react'
import './portfolio.css'
import Image from 'next/image'

const data = [
  //TODO: add the EcoDex application here as soon as it's hosted on vercel
  {
    id: 0,
    image: ``,
    title: 'EcoDex',
    github: 'https://github.com/Kyoko522/EcoDex',
    demo: 'link',
    description: 'EcoDex is a web application that allows users to search for and view information about various plant species. The application uses the Plant API to fetch data about plants, including their scientific names, common names, and images. Users can search for plants by their common or scientific names, and view detailed information about each plant.', 
    moreOptions: true,
  },
  {
    id: 1,
    image: `/assets/food_management.png`,
    title: 'Food Management App',
    github: 'https://github.com/Kyoko522/Food-Management',
    description: 'An initiative by the Practical Application of Computer Science (PACS) club in collaboration with VIRO. This Android application aims to reduce food waste by connecting event organizers with students and club members interested in receiving surplus food after events. The app facilitates a sustainable solution, ensuring that excess food doesn\'t go to waste and benefits those in need.',
  },
  {
    id: 2,
    image: `/assets/portfolio.png`,
    title: 'Personal Portfolio',
    github: 'https://github.com/Kyoko522/react-portfolio',
    demo: 'https://sheelportfolio.vercel.app/',
    description: 'This is a personal portfolio built with Next.js to showcase my academic projects, skills, and experiences. It includes an interactive "About Me" section with an image carousel and a dynamic project listing with links to GitHub repositories and live demos.'
  },
  {
    id: 3,
    image: `/assets/astro.jpg`,
    title: '3D Animated Portfolio',
    github: 'https://github.com/Kyoko522/Sheel-3D-Portfolio/tree/main',
    demo: 'https://sheel-portfolio.vercel.app/',
    description: 'This is a 3D animated portfolio built with Three.js and React. It includes a 3D model of me, a dynamic project listing with links to GitHub repositories and live demos, and a contact form. The 3D model can be rotated and zoomed in/out using the mouse or touch gestures on mobile devices.'
  },
  {
    id: 4,
    image: `/assets/Tasktonic.png`,
    title: 'TaskTonic',
    github: 'https://github.com/Kyoko522/TaskTonic',
    demo: 'https://tasktonic.netlify.app/',
    description: 'TaskTonic is a task management application that allows users to create, edit, and delete tasks. It features a responsive design, a dark mode toggle, and the ability to filter tasks by their status (All, Active, Completed). The tasks are stored in the browser\'s local storage, so they persist even after the page is refreshed.'
  },
  {
    id: 5,
    image: `/assets/Minesweeper.png`,
    title: 'Minesweeper',
    github: 'https://github.com/Kyoko522/MineSweeper-Game',
    description: 'Minesweeper is a classic game of strategy, where the objective is to clear a grid of squares by revealing all the safe squares and avoiding revealing the bombs. The game board is a 9x9 grid, with a randomly generated number of bombs. The player can flag squares with the right mouse button to indicate they think they contain a bomb, and the game will automatically reveal the bombs when necessary.'
  },
  {
    id: 6,
    image: `/assets/Flashcards-pic.png`,
    title: 'Python Flashcards',
    github: 'https://github.com/Kyoko522/Flash_Cards',
    description: 'Python Flashcards is a command-line application that helps users learn Python programming concepts through flashcards. The user can view a list of flashcards, add new flashcards, delete flashcards, and quiz themselves on the flashcards. The application uses a JSON file to store the flashcards, which allows the user to save their progress between sessions.'
  },
  {
    id: 7,
    image: `/assets/Chess.png`,
    title: 'Chess',
    github: 'https://github.com/Kyoko522/Chess',
    description: 'Chess is a JFrame application that allows two players to play a game of chess. The game board is displayed, and the players take turns making moves. The application uses object-oriented programming principles to represent the chess board, pieces, and players. The player can move pieces, capture opponents, and checkmate the opponent. Currently still under work attempting to implement ai functionality with Minimax algorithm.', 
  },
]

export const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Projects</h5>
      <h2>Portfolio</h2>

      <div className="portfolio__container">
        {data.map(({ id, image, title, github, demo, description, moreOptions }) => (
          <div key={id}>
            {/* Flip card */}
            <div className="portfolio__card">
              <div className="portfolio__card-inner">
                <div className="portfolio__card-front">
                  <div className="portfolio__item-image">
                    <img src={image} alt={title} />
                  </div>
                  <h3 className="portfolio__item-title">{title}</h3>
                </div>

                <div className="portfolio__card-back">
                  <h3>About the Project</h3>
                  <p>{description}</p>
                </div>
              </div>
            </div>

            {/* Buttons outside the flipping card */}
            <div className="portfolio__item-cta">
              <a href={github} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
              {demo && (
                <a href={demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
              )}
              {moreOptions && (
                <button className="btn btn-primary" target='_blank' rel='noopener noreferrer'>More</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio
