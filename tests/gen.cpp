#include <cstdio>
#include <cstdlib>
#include <ctime>

int main(int argc, char *argv[])
{
    if(argc != 3)
    {
        printf("%s N T", argv[0]);
        return 1;
    }
    
    srand(time(NULL));

    int N = atoi(argv[1]);
    int T = atoi(argv[2]);
    int area[N][N] = {0};

    printf("%d %d\n", N, T);
    for(int i = 0; i < T; i++)
    {
        int x, y;
        x = rand() % N + 1;
        y = rand() % N + 1;
        if(area[x][y] != 0)
        {
            i--;
            continue;
        }
        area[x][y] = 1;
        printf("%d %d\n", x, y);
    }

    return 0;
}
