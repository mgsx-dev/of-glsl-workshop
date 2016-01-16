#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

float nsin(float x)
{
	return sin(x * 3.1415) * 0.5 + 0.5;
}

vec3 randcolor1rgb(float v, float r, float g, float b, float rr, float rg, float rb)
{
	float s1 = fract(sin(v * 3000.0 + 2000.0));
	float s2 = fract(sin(s1 * 3000.0));
	float s3 = fract(sin(s2 * 3000.0));
	return vec3(s1 * rr + r, s2 * rg + g, s3 * rb + b);
}

float nz2(vec2 v)
{
	return fract(sin(floor(v.x) * 235673.432 + floor(v.y) * 2986.467 + 1336.5932)) * 2.0 - 1.0;
}
vec2 nz22(vec2 v)
{
	return vec2(nz2(v * 123654.6), nz2(v * 456.765));
}

float manathan(vec2 v)
{
	return (abs(v.x) + abs(v.y)) * 0.1;
}

vec3 voronoi(vec2 pos, float randomness)
{
	vec2 ipos = floor(pos);
	float md = 1;
	float md2 = 1;
	float index = 0;
	for(int i=-1 ; i<2 ; i++)
	{
		for(int j=-1 ; j<2 ; j++)
		{
			vec2 adj = ipos + vec2(i, j);
			adj += nz22(adj) * randomness;
			float d = manathan(adj - pos);
			if(d < md){ md2 = md; md = d; index = nz2(ipos + vec2(i, j));}
		}
	}
	
	return vec3(md, md2, index);
}

float soft(float v, float rate)
{
	return 1 - pow(1 - v, rate);
}

void main()
{
 	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 
	
	vec3 voro = voronoi(pos * 16.0, cur.y);
	
	float v = voro.y - voro.x;
	
	v = 1.0 - pow(1 - v, 100.0);
	
	gl_FragColor = vec4(v,v,v, 1.0);
}