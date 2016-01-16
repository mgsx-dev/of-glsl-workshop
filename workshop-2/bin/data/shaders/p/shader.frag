#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;


float nz2(vec2 v)
{
	return fract(sin(floor(v.x) * 235673.432 + floor(v.y) * 2986.467 + 1336.5932)) * 2.0 - 1.0;
}
vec2 nz22(vec2 v)
{
	return vec2(nz2(v * 123654.6), nz2(v * 456.765));
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
			float d = length(adj - pos);
			if(d < md){ md2 = md; md = d; index = nz2(ipos + vec2(i, j));}
		}
	}
	
	return vec3(md, md2, index);
}

void main()
{
 	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 

	pos *= cur.x * 2.0;

	vec3 voro = voronoi((pos + sin(pos * 10 + time * 2) * 0.04) * 6.0, 0.3);
	vec3 voro2 = voronoi((pos + sin(pos * 5 + time * 3) * 0.02) * 3.0, 0.3);
	
	float v = voro2.x + voro.x * 0.5;
	
	vec3 color = mix(vec3(0.5, 0.5, 1.0), vec3(0.0, 1.0, 1.0), pow(v, 2));
	
	gl_FragColor = vec4(color, 1.0);
}