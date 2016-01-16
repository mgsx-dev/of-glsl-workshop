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



float voronoi(vec2 pos)
{
	vec2 ipos = floor(pos);
	float md = 1;
	float md2 = 1;
	for(int i=-1 ; i<2 ; i++)
	{
		for(int j=-1 ; j<2 ; j++)
		{
			vec2 adj = ipos + vec2(i, j);
			adj += nz22(adj) * 0.3;
			float d = length(adj - pos);
			if(d < md){ md2 = md; md = d; }
		}
	}
	
	return md;
}

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 
	
	float v = voronoi(pos * 6.0) ;
	
	vec3 color = vec3(v, v, v);
	
	gl_FragColor = vec4(color, 1.0);
}