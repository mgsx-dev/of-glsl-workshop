#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

varying vec3 vPos;

float nz2(vec2 v)
{
	return fract(sin(floor(v.x) * 235673.432 + floor(v.y) * 2986.467 + 1336.5932)) * 2.0 - 1.0;
}
vec2 nz22(vec2 v)
{
	return vec2(nz2(v * 123654.6), nz2(v * 456.765));
}


vec2 voronoi(vec2 pos)
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
	
	return vec2(md, md2);
}

float rand2(vec2 co){ 
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453) * 2.0 - 1.0;
}

float hermite(float t)
{
  return t * t * (3.0 - 2.0 * t);
}

float snoise2(vec2 co, float frequency)
{
  vec2 v = vec2(co.x * frequency, co.y * frequency);

  float ix1 = floor(v.x);
  float iy1 = floor(v.y);
  float ix2 = floor(v.x + 1.0);
  float iy2 = floor(v.y + 1.0);

  float fx = hermite(fract(v.x));
  float fy = hermite(fract(v.y));

  float fade1 = mix(rand2(vec2(ix1, iy1)), rand2(vec2(ix2, iy1)), fx);
  float fade2 = mix(rand2(vec2(ix1, iy2)), rand2(vec2(ix2, iy2)), fx);

  return mix(fade1, fade2, fy);
}

float pnoise2(vec2 co, float freq, int steps, float persistence)
{
  float value = 0.0;
  float ampl = 1.0;
  float sum = 0.0;
  for(int i=0 ; i<steps ; i++)
  {
    sum += ampl;
    value += snoise2(co, freq) * ampl;
    freq *= 2.0;
    ampl *= persistence;
  }
  return value / sum;
}

void main()
{
	float h = vPos.z / 10.0;
	
	// water
	vec2 waterVor1 = voronoi((vPos.xy * 4.0 + sin(vPos.xy * 40 + time * 2) * 0.04) * 6.0);
	vec2 waterVor2 = voronoi((vPos.xy * 4.0 + sin(vPos.xy * 20 + time * 3) * 0.02) * 3.0);
	
	float waterVor = waterVor1.x + waterVor2.x * 0.5;
	
	vec3 waterColor = mix(vec3(0.5, 0.5, 1.0), vec3(0.0, 1.0, 1.0), pow(waterVor, 2));
		
	// ground
	vec2 groundVor = voronoi(vPos.xy * 200.0);
	float ground = 1.0 - pow(groundVor.y - groundVor.x, 0.1);
	vec3 groundColor = mix(vec3(1.0, 0.7, 0.5), vec3(0.5,0.25,0), ground);
	
	vec3 groundFinalColor = groundColor * clamp((1.0 - pnoise2(vPos.zz, 10.0, 2, 0.5)), 0, 2) * (smoothstep(0.3, 0.7, h) + 0.5);


	vec3 color = mix(waterColor, groundFinalColor, smoothstep(0.29, 0.3, h));

	color = mix(color, vec3(1.0), pow(clamp(h * 1.65, 0, 1), 10.0));
	
	gl_FragColor = vec4(color, 1.0);
}