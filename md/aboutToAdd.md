# Rubik's cube

I'll take you through my journey of coding rubik's cube and other matters with it. Let's start with describing how Rubik's cube looks and what terminology I'm using. 
Rubik's cube has 26 small cubes, let's call them cubies. Every cubie is made of 6 sides, as usually, and I call these sides tiles. This tiles are coloured, however we can see that not every tile of cubie is visible. We may separate cubies into 3 categories, based on how many tiles of cubie are visible. Firstly, middle parts, where only 1 tile is visible, there are 6 these parts and there are immobile, any move you'll do, they will stay in the same place and they are not moving relativly to other middle parts.
Secondly, side parts, these have 2 visible tiles, there are 12 of them. Lastly, corner parts, with 3 visible tiles, 8 of them.

# Representation
Firstly I decided how to represent state of Rubik's cube. There are more options, however I started with the simpliest
one for me. For every side of cube I have 2D array 3x3, and on $(i, j)$ position is color that part in


# DFS with maximal depth
I started to search state space with maximal depth of nesting. There is difference than a normal DFS because in this situation I can't just use set of visited states. I also need to note in which depth I visited the state. There are lot of cycles in the graph of states, and so if I visit some state for second time, if I visit it in lower depth, I need to go again search from that state, because I will get further. If I hadn't continued searched through that state I could miss some states in next depths.

# IDDFS
This idea may be used to implement algorithm IDDFS, which is basiclly running DFS with depths from 1 to some number. This, for sure, will give us also the shortest number of moves to solve the cube, as does BFS. We may see that unlike in BFS we will do much more work, because we are repeating same searches again and again. For example, if the shortest number of moves to solve the cube is 6, then we are searching to depth 4, then 5, then 6 and we search the first depth 6 times, the second depth 5 times and so on. However the number of states with depth is increasing exponencially.

The advantage of this approach is that the program doesn't need to remember all of the states.

# BFS 
Basic BFS that will find the shortest number of moves to solve the cube.

# I