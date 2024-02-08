function foo(n) {
    let i=1;

    return (x)=> (x + i++)*n;

}
let buzz = foo(10);
//donc on peut invoquer buzz:
buzz( 5 );
console.log(buzz);