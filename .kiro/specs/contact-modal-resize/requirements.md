# Requirements Document

## Introduction

This feature involves resizing the ContactOwnerModal component to make it 1.5x wider and 33% shorter than its current dimensions while maintaining all existing content and functionality. The modal should have a more landscape-oriented layout that better utilizes screen real estate.

## Requirements

### Requirement 1

**User Story:** As a user viewing the contact owner modal, I want the modal to be significantly wider so that I can see more content horizontally without excessive scrolling.

#### Acceptance Criteria

1. WHEN the ContactOwnerModal is displayed THEN the modal SHALL be 1.5x wider than the current width
2. WHEN the modal is wider THEN all existing content SHALL remain visible and properly formatted
3. WHEN the modal width increases THEN the layout SHALL adapt to utilize the additional horizontal space effectively

### Requirement 2

**User Story:** As a user viewing the contact owner modal, I want the modal to be shorter vertically so that it takes up less screen height and feels more compact.

#### Acceptance Criteria

1. WHEN the ContactOwnerModal is displayed THEN the modal SHALL be 33% shorter than the current height
2. WHEN the modal height decreases THEN all content sections SHALL be compressed vertically while remaining readable
3. WHEN the modal is shorter THEN no content SHALL be cut off or hidden
4. WHEN the modal is shorter THEN the layout SHALL maintain proper spacing and visual hierarchy

### Requirement 3

**User Story:** As a user interacting with the contact owner modal, I want all existing functionality to work exactly as before despite the size changes.

#### Acceptance Criteria

1. WHEN the modal is resized THEN all buttons SHALL remain functional
2. WHEN the modal is resized THEN all animations and transitions SHALL work as before
3. WHEN the modal is resized THEN the close functionality SHALL work properly
4. WHEN the modal is resized THEN the "Mark as Resolved" button SHALL function correctly