# Design Document

## Overview

The ContactOwnerModal component needs to be resized to be 1.5x wider and 33% shorter while maintaining all existing functionality. The current modal uses a vertical layout that can be optimized for a more horizontal, landscape-oriented design.

## Architecture

The modal consists of several key sections that need to be restructured:
1. Header with profile information and trust score
2. Verification badges section
3. Stats section (successful returns and community rating)
4. Contact methods section
5. Action buttons section

## Components and Interfaces

### Current Layout Issues
- The modal uses `max-w-7xl` but may be constrained by parent containers
- Vertical sections are stacked, creating unnecessary height
- Padding and margins are generous, contributing to excessive height

### Proposed Layout Changes

#### Width Optimization (1.5x wider)
- Remove any parent container width constraints
- Use a more aggressive max-width setting
- Ensure the modal container can expand to full available width
- Consider using viewport-based width units for better control

#### Height Optimization (33% shorter)
- Combine sections horizontally where possible
- Reduce all vertical padding and margins significantly
- Create a more compact grid layout
- Minimize spacing between elements
- Use flexbox for better space utilization

## Data Models

No changes to data models are required. All existing props and data structures remain the same.

## Error Handling

All existing error handling remains unchanged. The resize should not affect any functional aspects of the modal.

## Testing Strategy

- Visual regression testing to ensure layout changes work correctly
- Functional testing to verify all buttons and interactions still work
- Responsive testing to ensure the modal works on different screen sizes
- Animation testing to verify all motion effects still function properly

## Implementation Approach

### Phase 1: Width Expansion
1. Identify and remove width constraints
2. Use more aggressive max-width values
3. Ensure proper horizontal space utilization

### Phase 2: Height Compression
1. Reduce all vertical padding systematically
2. Combine sections into horizontal layouts where possible
3. Minimize gaps and margins between elements
4. Create a more compact overall structure

### Phase 3: Layout Optimization
1. Reorganize content into a more horizontal flow
2. Use CSS Grid and Flexbox for better space management
3. Ensure all content remains accessible and readable

## Key Design Decisions

1. **Width Strategy**: Use viewport-based units and remove container constraints to achieve true 1.5x width increase
2. **Height Strategy**: Systematically reduce all vertical spacing by approximately 33% while maintaining readability
3. **Layout Strategy**: Maintain existing component structure but optimize spacing and arrangement
4. **Responsive Strategy**: Ensure the changes work across different screen sizes