# Rubik's cube

I'll take you through my journey of coding rubik's cube and other matters with it. Let's start with describing how Rubik's cube looks and what terminology I'm using. 
Rubik's cube has 26 small cubes, let's call them cubies. Every cubie is made of 6 sides, as usually, and I call these sides tiles. This tiles are coloured, however we can see that not every tile of cubie is visible. We may separate cubies into 3 categories, based on how many tiles of cubie are visible. Firstly, middle parts, where only 1 tile is visible, there are 6 these parts and there are immobile, any move you'll do, they will stay in the same place and they are not moving relativly to other middle parts.
Secondly, side parts, these have 2 visible tiles, there are 12 of them. Lastly, corner parts, with 3 visible tiles, 8 of them.

# Representation
Firstly I decided how to represent state of Rubik's cube. There are more options, however I started with the simpliest
one for me. For every side of cube I have 2D array 3x3, and on $(i, j)$ position is color that part in