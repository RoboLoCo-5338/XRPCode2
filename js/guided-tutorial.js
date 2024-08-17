// Define your tutorial steps
const tutorialSteps = [
  { target: '.welcome-view', content: 'Connect your XRP to your computer with a USB cable and then press this button.' + 
    ' After the XRP connects this button will become a RUN button and underneath it will be the name of your XRP. You should label your XRP with this name.', position: 'top' },
  { target: '.welcome-view', content: 'This is where you will find your files', position: 'left' },
  { target: '.welcome-view', content: 'This is where you will find any output from your XRP, including print statements from your code.', position: 'bottom' },
  // Add more steps as needed
];

class GuidedTutorial {
  constructor(steps, mainDiv) {
    this.steps = steps;
    this.currentStep = 0;
    this.popover = null;
    this.arrow = null;
    this.mainDiv = mainDiv;
    this.init();
  }

  init() {
    this.createPopover();
    this.createArrow();
    this.showStep();
  }

  createPopover() {
    this.popover = document.createElement('div');
    this.popover.className = 'tutorial-popover';
    this.popover.innerHTML = `
      <button class="close-btn">&times;</button>
      <p class="content"></p>
      <div class="navigation">
        <button class="prev-btn">Previous</button>
        <button class="next-btn">Next</button>
      </div>
    `;
    this.mainDiv.appendChild(this.popover);

    this.popover.querySelector('.close-btn').addEventListener('click', () => this.close());
    this.popover.querySelector('.prev-btn').addEventListener('click', () => this.previousStep());
    this.popover.querySelector('.next-btn').addEventListener('click', () => this.nextStep());
  }

  createArrow() {
    this.arrow = document.createElement('div');
    this.arrow.className = 'tutorial-arrow';
    this.mainDiv.appendChild(this.arrow);
  }

  showStep() {
    const step = this.steps[this.currentStep];
    const targetElement = document.querySelector(step.target);
    if (!targetElement) return;

    this.popover.querySelector('.content').textContent = step.content;
    const targetRect = targetElement.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();

    let top, left;
    switch(step.position) {
      case 'top':
        top = targetRect.top;
        left = targetRect.right - (popoverRect.width + 15);
        break;
      case 'bottom':
        top = targetRect.bottom - popoverRect.height;
        left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + (targetRect.height - popoverRect.height) / 2;
        left = targetRect.left;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height - popoverRect.height) / 2;
        left = targetRect.width + popoverRect.width;
        break;
    }

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
    
    this.updateArrow(targetRect, { top, left, width: popoverRect.width, height: popoverRect.height });
    this.updateNavigation();
  }

  updateArrow(targetRect, popoverRect) {
    const arrowWidth = 20; // Increased width of the arrow
    const arrowOffset = 10; // Distance of arrow from the box
  
    let arrowStart, arrowEnd;
    
    switch(this.steps[this.currentStep].position) {
      case 'top':
        arrowStart = {
          x: popoverRect.left + popoverRect.width / 2,
          y: targetRect.top
        };
        arrowEnd = {
          x: popoverRect.left + popoverRect.width / 2,
          y: popoverRect.top - arrowOffset
        };
        break;
      case 'bottom':
        arrowStart = {
          x: targetRect.left + targetRect.width / 2,
          y: popoverRect.top + popoverRect.height - 20
        };
        arrowEnd = {
          x: popoverRect.left + popoverRect.width / 2,
          y: popoverRect.top + popoverRect.height - 20 + arrowOffset
        };
        break;
      case 'left':
        arrowStart = {
          x: popoverRect.left + arrowOffset,
          y: targetRect.top + targetRect.height / 2
        };
        arrowEnd = {
          x: popoverRect.left,
          y: popoverRect.top + popoverRect.height / 2
        };
        break;
      case 'right':
        arrowStart = {
          x: targetRect.right,
          y: targetRect.top + targetRect.height / 2
        };
        arrowEnd = {
          x: popoverRect.left + popoverRect.width + arrowOffset,
          y: popoverRect.top + popoverRect.height / 2
        };
        break;
    }
  
    const angle = Math.atan2(arrowEnd.y - arrowStart.y, arrowEnd.x - arrowStart.x);
    const length = Math.sqrt(Math.pow(arrowEnd.x - arrowStart.x, 2) + Math.pow(arrowEnd.y - arrowStart.y, 2));
  
    this.arrow.style.top = `${arrowStart.y}px`;
    this.arrow.style.left = `${arrowStart.x}px`;
    this.arrow.style.width = `${length}px`;
    this.arrow.style.height = `${arrowWidth}px`; // Set the height to our new arrow width
    this.arrow.style.transform = `rotate(${angle}rad)`;
  }

  updateNavigation() {
    this.popover.querySelector('.prev-btn').disabled = this.currentStep === 0;
    this.popover.querySelector('.next-btn').disabled = this.currentStep === this.steps.length - 1;
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.showStep();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep();
    }
  }

  close() {
    this.popover.remove();
    this.arrow.remove();
  }
}

// CSS styles (you can move this to a separate CSS file)
const styles = `
  .tutorial-popover {
    position: fixed;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    width: 200px;
  }
  .tutorial-popover .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  .tutorial-popover .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .tutorial-arrow {
    position: fixed;
    background: white;
    transform-origin: 0 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  .tutorial-arrow::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 0;
    width: 0;
    height: 0;
    border-left: 20px solid white;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

// Function to start the tutorial
function startTutorial(mainDiv) {
  // Add styles to the document
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  mainDiv.appendChild(styleElement);

  // Create and start the tutorial
  new GuidedTutorial(tutorialSteps, mainDiv);
}

// You can call startTutorial() when you want to begin the tutorial
// For example:
// document.getElementById('start-tutorial-btn').addEventListener('click', startTutorial);
