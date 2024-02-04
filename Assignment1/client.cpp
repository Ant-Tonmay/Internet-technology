#include<iostream>
#include<cstdlib>
using namespace std;

int main(int argc , char* argv[])
{
    if(argc<2){
        cout<<"Require more arugments"<<endl;
        return 1;
    }

    string request = "node client.js ";

    for(int i = 1 ; i<argc;i++){
        request=request+argv[i]+' ';
    }
    request.pop_back();
    system(request.c_str());
    return 0;
}